import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link'
import Layout from '../../components/Layout';
import { ReactGhLikeDiff } from "react-gh-like-diff";
import { getContract, Contract } from '../../lib/etherscan';

interface DiffPageProps {
  contractA: Contract;
  contractB: Contract;
}

const DiffPage: NextPage<DiffPageProps> = ({ contractA, contractB }) => {
  return (
    <Layout title="ETHDiff">
      <ReactGhLikeDiff
        options={{
          originalFileName: contractA.name,
          updatedFileName: contractB.name,
          drawFileList: false,
        }}
        past={contractA.source}
        current={contractB.source}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  console.log(params.addressA);

  const [contractA, contractB] = await Promise.all([
    getContract(params.addressA),
    getContract(params.addressB),
  ]);


  if (res) {
    res.setHeader('Cache-Control', 's-maxage=1800');
  }

  return { props: { contractA, contractB } };
};


export default DiffPage
