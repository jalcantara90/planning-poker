import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

export function buildValidation() {
  return yupResolver(
    yup.object().shape({
      name: yup.string().required('Name is required')
    })
  );
}