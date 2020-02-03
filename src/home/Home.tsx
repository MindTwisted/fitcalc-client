import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Responsive, Visibility, Segment } from "semantic-ui-react";
import NavigationBar from "./NavigationBar";
import Heading from "./Heading";
import Layout from "./Layout";
import { RootState } from "../store";
import { boundSetLang } from "../store/system/actions";
import { bindActionCreators, Dispatch } from "redux";

type HomeProps = ConnectedProps<typeof connector>;

const Home: React.FC<HomeProps> = ({ system, setLang }: HomeProps) => {
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
          <NavigationBar fixed={fixed}
            lang={system.lang}
            handleLangChange={(lang: string) => setLang(lang)}
          />
          <Heading mobile={mobile} />
        </Segment>
      </Visibility>

      <Layout />
    </Responsive>
  );
};

const mapStateToProps = (state: RootState) => ({
  system: state.system
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    setLang: boundSetLang
  }, dispatch)
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Home);