import React, { ComponentProps } from 'react';

type Props = ComponentProps<'input'> & {
	register: any;
};

const PollsInput = ({ register, ...props }: Props) => {
	return <input {...register} {...props} />;
};

export default PollsInput;
