/* eslint-disable no-empty-pattern */
'use client';
/** @jsxImportSource @emotion/react */
import { forwardRef, InputHTMLAttributes } from 'react';

import {
  CheckboxContainer,
  Container,
  ElementsContainer,
  InputElement,
  LabelElement,
  LabelText,
} from './CheckboxComponent.styles';
// import { Label } from '~/src/app/(auth)/login/CheckboxComponent/Label/Label';
import { Label } from './Label/Label';

type formElementProps = InputHTMLAttributes<HTMLInputElement>;

export const CheckboxComponent = forwardRef<HTMLInputElement, formElementProps>(({}, ref) => {
  return (
    <Container>
      <Label state={'default'}>
        <CheckboxContainer>
          <ElementsContainer>
            <LabelElement>
              <InputElement type="checkbox" ref={ref} />
              <LabelText>Запам`ятати пароль</LabelText>
            </LabelElement>
          </ElementsContainer>
        </CheckboxContainer>
      </Label>
    </Container>
  );
});

CheckboxComponent.displayName = 'CheckboxComponent';
