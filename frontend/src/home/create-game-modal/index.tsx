import { FC } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Text, Input, Button, Radio } from '@nextui-org/react';

import { CreateGameForm } from './type';
import { useGame } from '../../shared/game/hooks';
import { FibonnacciSystem, Game, TShirtSystem, VotingSystem, votingSystemList } from '../../shared/game/types';


type CreateGameModalProps = {
  visible: boolean,
  onClose: () => void;
}

export const CreateGameModal: FC<CreateGameModalProps> = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const { create } = useGame();

  const methods = useForm<CreateGameForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      votingSystem: FibonnacciSystem.id
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required('Name is required')
      })
    )
  });

  const { control, handleSubmit, formState: { isValid } } = methods;

  const handleCreate = async (values: CreateGameForm) => {
    const game: Game = {
      name: values.name,
      votingSystem: votingSystemList.find(vs => vs.id === values.votingSystem) ?? {} as VotingSystem ,
      members: []
    }
    await create(game);
    navigate('gameId');
    onClose();
  }

  return (
    <Modal
      closeButton
      blur
      width="40rem"
      aria-labelledby="modal-title"
      open={visible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Choose a name and a voting system for your game.
        </Text>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Modal.Body>
          <Controller 
            name="name"
            control={control}
            render={({ field }) =>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Game's name"
                {...field}
              />
            }
          /> 
          
          <Controller
              name="votingSystem"
              control={control}
              render={
                ({ field }) => (
                  <Radio.Group row {...field}>
                    <Radio
                      value={FibonnacciSystem.id}>
                      Fibonnacci<Radio.Description>0,1,3,5,8,13,21,34..</Radio.Description>
                    </Radio>
        
                    <Radio
                      value={TShirtSystem.id}>
                      T-shirts<Radio.Description>s,m,l,xl</Radio.Description>
                    </Radio>
                    <Button size="lg" color="gradient" rounded bordered disabled> Comming soon </Button>
                  </Radio.Group>
                )
              }
          />
          
        </Modal.Body>
        <Modal.Footer autoMargin={false} justify="center">
          <Button animated size="lg" disabled={!isValid}>
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}