import React, { useEffect, useState } from "react";
import { Responsive, Visibility, Segment } from "semantic-ui-react";
import NavigationBar from "./NavigationBar";
import Heading from "./Heading";
import Layout from "./Layout";

const Home: React.FC = () => {
  const [fixed, setFixed] = useState(false);
  const [mobile, setMobile] = useState(false);

  const handleResize = () => {
    setMobile(window.innerWidth < 768);
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Responsive>
      <Visibility 
        once={false}
        onBottomPassed={() => setFixed(true)}
        onBottomPassedReverse={() => setFixed(false)}
      >
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: mobile ? 400 : 700, padding: '1em 0em' }}
          vertical
        >
          <NavigationBar fixed={fixed} />
          <Heading mobile={mobile} />
        </Segment>
      </Visibility>

      <Layout />
    </Responsive>
  );
};

export default Home;