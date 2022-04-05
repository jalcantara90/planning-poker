import { Button, Input, Modal, Switch, Text } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUserContext } from "../../shared/user/context";
import { User } from "../../shared/user/types";
import { Label } from "./styled";
import { buildValidation } from "./utils";

type LoginModalForm = {
  name: string;
  isSpectator: boolean;
}

export const LoginModal: FC = () => {
  const { user, createUser } = useUserContext();
  const [visible, setVisible] = useState<boolean>(false);

  const methods = useForm<LoginModalForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      isSpectator: false
    },
    resolver: buildValidation()
  });

  useEffect(() => {
    setVisible(!(user as User).name);
  }, [user])

  const { control, handleSubmit, formState: { isValid } } = methods;
  const handleLogin = (values: LoginModalForm) => {
    createUser({ ...values });
  }

  return (
    <Modal
      blur
      width="40rem"
      aria-labelledby="login-modal-title"
      open={visible}
      onClose={() => setVisible(false)}
    >
      <Modal.Header>
        <Text id="login-modal-title" size={24}>
          Login
        </Text>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Modal.Body>
          <Controller 
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) =>
              <>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Write your name"
                  {...field}
                />
                <Text color="error" size={14} css={{ pb: '.5rem', pl: '1rem' }}>{error?.message}</Text>
              </>
            }
          />

          <Controller
            name="isSpectator"
            control={control}
            render={({ field }) => 
              <Label htmlFor="is-spectator">
                <Text> ¿ Are you a spectator ? </Text>
                <Switch
                  id="is-spectator"
                  css={{ ml: '1rem' }}
                  checked={field.value}
                  size="xl"
                  onChange={(ev) => field.onChange(ev.target.checked)}
                  onBlur={field.onBlur}
                />
              </Label>    
            }
          />
          
        </Modal.Body>
        <Modal.Footer autoMargin={false} justify="center">
          <Button animated size="lg" disabled={!isValid}>
            Login
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}