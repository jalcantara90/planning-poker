import { Modal, Text, Input, Button, Radio } from '@nextui-org/react';
import { FC } from 'react';

type CreateGameModalProps = {
  visible: boolean,
  onClose: () => void;
}

export const CreateGameModal: FC<CreateGameModalProps> = ({ visible, onClose }) => {
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
      <Modal.Body>
        <div style={{
          minWidth: '40rem'
        }}></div>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Game's name"
        />
        <Radio.Group value="1" row>
          <Radio value="1">
            Fibonnacci<Radio.Description>0,1,3,5,8,13,21,34..</Radio.Description>
          </Radio>
          <Radio value="2">
            T-shirts<Radio.Desc>s,m,l,xl</Radio.Desc>
          </Radio>
          <Button size="lg" color="gradient" rounded bordered> Custom voting system </Button>
        </Radio.Group>
      </Modal.Body>
      <Modal.Footer autoMargin={false} justify="center">
        <Button animated size="lg" onClick={onClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}