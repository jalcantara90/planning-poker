import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Text, Input, Button, Radio } from '@nextui-org/react';

import { CreateGameForm } from './types';
import { buildValidation } from './validation';
import { useGameCreate } from '../../shared/game/hooks';
import { useVotingSystem } from '../../shared/voting-system/hooks';

type CreateGameModalProps = {
  visible: boolean,
  onClose: () => void;
}

export const CreateGameModal: FC<CreateGameModalProps> = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const { create } = useGameCreate();
  const { votingSystemList } = useVotingSystem();

  const methods = useForm<CreateGameForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      votingSystemId: ''
    },
    resolver: buildValidation()
  });

  const { control, handleSubmit, formState: { isValid } } = methods;

  const handleCreate = async (values: CreateGameForm) => {
    const result = await create(values);
    navigate(result.id);
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
            name="votingSystemId"
            control={control}
            render={
              ({ field }) => (
                <Radio.Group row {...field}>
                  {
                    votingSystemList?.map(votingSystem => <VotingSystemOption key={votingSystem.id} {...votingSystem}/>)
                  }
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

type VotingSystemOptionProps = {
  id: string;
  name: string;
  options: string[];
};

const VotingSystemOption: FC<VotingSystemOptionProps> = ({ id, name, options }) => {
  return (
    <Radio
      value={id}>
      {name}<Radio.Description>{options.join(', ')}</Radio.Description>
    </Radio>
  );
}
