import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiAward, FiArchive, FiCalendar, FiDisc } from 'react-icons/fi';

import * as yup from 'yup';
import getValidationError from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
// import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import EventSearch from '../../components/EventSearch';
import Menu from '../../components/Menu';
import MenuButton from '../../components/MenuButton';
import Dropzone from '../../components/Dropzone';

import { Container, Content, AnimationContainer, ContentSearch, AnimationSearchContainer } from './styles';

interface CreateFormData {
  issueType: string;
  errorNumber: string;
  product: string;
  description: string;
  solution: string;
}

interface SearchFormData {
  issueType: string;
  errorNumber: string;
  product: string;
}

interface ProductData {
  productId: string;
  name: string;
}

interface TypeData {
  typeId: string;
  name: string;
}

interface SelectData {
  value: string;
  label: string;
}


const Event: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles | null>(null);
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleMenuButtonClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          product: yup
            .number()
            .moreThan(0)
            .required('Selecione um produto'),
          issueType: yup
            .number()
            .moreThan(0)
            .required('Selecione um tipo'),
          errorNumber: yup
              .string()
              .required('Insira um número de Erro ou um identificador'),
          description: yup
              .string()
              .required('Insira uma descrição do problema'),
          solution: yup
              .number()
              .required('Insira uma solução do problema'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await CreateIssue({
        //   issueType: data.issueType,
        //   errorNumber: data.errorNumber,
        //   product: data.product,
        //   description: data.description,
        //   solution: data.solution,
        // });
        addToast({
          type: 'sucess',
          title: 'Cadastrado com sucesso.',
        });
        history.push('/issue');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer o cadastro, cheque as informações',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history]
  );

  const handleSearch = useCallback(
    async (data: SearchFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        // await SearchIssue({
        //   issueType: data.issueType,
        //   issueNumber: data.errorNumber,
        //   product: data.product,
        // });

        addToast({
          type: 'sucess',
          title: 'Pesquisa realizada com sucesso.',
        });
        history.push('/events');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na pesquisa',
          description:
            'Ocorreu um erro ao fazer a pesquisa, cheque as informações',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <div>
        <MenuButton open={open} onClick={handleMenuButtonClick} />
        <Menu open={open} />
      </div>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoEvents" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro de Eventos</h1>

            {/* <Select
              icon={FiType}
              name="product"
              exampleText="Selecione o tipo do evento"
              options={productBox}
            />          */}
            <Input
              icon={FiAward}
              name="name"
              placeholder="Nome do evento"
              type="text"
            />
            <Input
              icon={FiDisc}
              name="place"
              placeholder="Local do evento"
              type="text"
            />
            <Input
              icon={FiCalendar}
              name="event_date"
              placeholder="Data do evento"
              type="date"
            />

            <Dropzone onFileUploaded={setSelectedFile} />

            <TextArea
              icon={FiArchive}
              name="coment"
              placeholder="Comentario."
            />

            <Button isLoading={loading} type="submit">
              Salvar
            </Button>

            <Button isLoading={loading} type="submit" hidden>
              Excluir
            </Button>

          </Form>
          <Link to="/" onClick={signOut}>
            <FiLogOut />
            Sair
          </Link>
        </AnimationContainer>
      </Content>
      <ContentSearch>
        <AnimationSearchContainer>
            <h1>Eventos</h1>
          <Form ref={formRef} onSubmit={handleSearch}>
            <div>
              <Input
                icon={FiCalendar}
                name="event_date"
                placeholder="Data do evento"
                type="date"
              />
              <Button isLoading={false} type="submit">
              Pesquisar
            </Button>
            </div>
            <EventSearch EventDate="01/01/2000" Name="evento teste" Description="description"/>
            <EventSearch EventDate="01/01/2000" Name="evento teste" Description="description"/>
            <EventSearch EventDate="01/01/2000" Name="evento teste" Description="description"/>
          </Form>

        </AnimationSearchContainer>
      </ContentSearch>
    </Container>
  );
};

export default Event;
