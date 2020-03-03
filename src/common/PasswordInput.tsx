import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';

type PasswordInputProps = {};

const PasswordInput: React.FC<PasswordInputProps> = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
    
  return (
    <Input {...props}
      type={showPassword ? 'text' : 'password'}
      icon={(
        <Icon link
          name={showPassword ? 'eye slash' : 'eye'}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    />
  );
};

export default PasswordInput;