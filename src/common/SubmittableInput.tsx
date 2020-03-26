import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Input, Icon, Button } from 'semantic-ui-react';

type SubmittableInputProps = {
  onSubmitInput: (value: string) => Promise<void | {clearValue: boolean}> | void | {clearValue: boolean};
  inputEl?: React.ElementType;
};

const SubmittableInput: React.FC<SubmittableInputProps> = ({
  onSubmitInput,
  inputEl,
  ...rest
}: SubmittableInputProps) => {
  const [value, setValue] = useState('');
  const InputElement = inputEl ? inputEl : Input;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    const submitData = await onSubmitInput(value);

    // noinspection PointlessBooleanExpressionJS
    if (submitData && submitData.clearValue === true) {
      setValue('');
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      await handleSubmit();
    }
  };
  
  return (
    <Input action>
      <InputElement {...rest}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <Button.Group>
          <Button icon
            secondary
            onClick={() => setValue('')}
          >
            <Icon name='cancel' />
          </Button>

          <Button icon
            primary
            onClick={handleSubmit}
          >
            <Icon name='save' />
          </Button>
        </Button.Group>
      )}
    </Input>
  );
};

export default SubmittableInput;