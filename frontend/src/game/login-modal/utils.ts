import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export function buildValidation() {
  return yupResolver(
    yup.object().shape({
      name: yup.string().required('Name is required'),
      isSpectator: yup.boolean()
    })
  );
}
