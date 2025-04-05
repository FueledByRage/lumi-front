import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Drawer from '../../../../components/Drawer';
import { InvoiceService } from '../../../../services/invoices/InvoiceService';
import {
  DrawerContainer,
  Title,
  Form,
  FileInputContainer,
  FileInputLabel,
  FileInput,
  SubmitButton,
  CloseButton,
  Message,
  ButtonGroup
} from './UploadDrawer.styles';

interface UploadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadDrawer({ isOpen, onClose }: UploadDrawerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { mutate, isPending, error } = useMutation({
    mutationFn: (file: File) => InvoiceService.uploadInvoice(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      setSuccess(true);
      setFile(null);
      
      setTimeout(() => {
        if (success) onClose();
      }, 2000);
    },
    onError: (error) => {
      console.error('Error uploading file:', error);
      setSuccess(false);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    mutate(file);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContainer>
        <Title>Enviar nova fatura</Title>
        
        <Form onSubmit={handleSubmit}>
          <FileInputContainer>
            <FileInputLabel htmlFor="invoice-file">Arquivo:</FileInputLabel>
            <FileInput
              id="invoice-file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.csv,.xlsx"
            />
          </FileInputContainer>
          
          <ButtonGroup>            
            <CloseButton type="button" onClick={onClose}>
              Cancelar
            </CloseButton>

            <SubmitButton 
              type="submit" 
              disabled={!file || isPending}
            >
              {isPending ? 'Enviando...' : 'Enviar'}
            </SubmitButton>
          </ButtonGroup>
          
          {success && (
            <Message type="success">
              Fatura enviada com sucesso!
            </Message>
          )}
          
          {error && (
            <Message type="error">
              {error instanceof Error ? error.message : "Erro ao enviar o arquivo."}
            </Message>
          )}
        </Form>
      </DrawerContainer>
    </Drawer>
  );
}