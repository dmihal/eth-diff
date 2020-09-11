import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link'
import Layout from '../../components/Layout';
import { ReactGhLikeDiff } from "react-gh-like-diff";


const AboutPage: NextPage = () => {
  return (
    <Layout title="ETHDiff">
      <ReactGhLikeDiff
        options={{
          originalFileName: 'A',
          updatedFileName: "B"
        }}
        past={'ABC-123\nP\nS'}
        current={'ABC\nS'}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {


  if (res) {
    res.setHeader('Cache-Control', 's-maxage=1800');
  }

  return { props: { } };
};


export default AboutPage
