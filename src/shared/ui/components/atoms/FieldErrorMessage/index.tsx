import React, { ComponentProps, FC } from 'react';
import css from './index.module.css';

type Props = ComponentProps<'p'> & {
	msg: string;
};
const FieldErrorMessage: FC<Props> = ({ msg, className, ...props }) => (
	<p className={`${css.error} ${className ? className : ''}`}>{msg}</p>
);

export default FieldErrorMessage;
