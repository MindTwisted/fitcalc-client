import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

type LoadingProps = {
  active: boolean;
};

const Loading: React.FC<LoadingProps> = ({ active }: LoadingProps) => {
  return (
    <Dimmer active={active}
      page
    >
      <Loader />
    </Dimmer>
  );
};

export default Loading;