import { useState } from 'react';
import Drawer from '../../../components/Drawer';
import { InvoiceService } from '../../../services/invoices/InvoiceService';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      await InvoiceService.uploadInvoice(file);
      setSuccess(true);
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Erro ao enviar o arquivo.");
    } finally {
      setLoading(false);
    }
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
              disabled={!file || loading}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </SubmitButton>
          </ButtonGroup>
          
          {success && (
            <Message type="success">
              Fatura enviada com sucesso!
            </Message>
          )}
          
          {error && (
            <Message type="error">
              {error}
            </Message>
          )}
        </Form>
      </DrawerContainer>
    </Drawer>
  );
}