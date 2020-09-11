import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link'
import Layout from '../../components/Layout';
import { ReactGhLikeDiff } from "react-gh-like-diff";
import { getContract, Contract } from '../../lib/etherscan';

interface DiffPageProps {
  contractA: Contract | null;
  contractB: Contract | null;
  addressA: string;
  addressB: string;
}

const DiffPage: NextPage<DiffPageProps> = ({ contractA, contractB, addressA, addressB }) => {
  if (!contractA) {
    return (
      <Layout title="Not found">
        No contract source code found at {addressA}
      </Layout>
    );
  }
  if (!contractB) {
    return (
      <Layout title="Not found">
        No contract source code found at {addressB}
      </Layout>
    );
  }

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
  const [contractA, contractB] = await Promise.all([
    getContract(params.addressA),
    getContract(params.addressB),
  ]);


  if (res) {
    res.setHeader('Cache-Control', 's-maxage=1800');
  }

  return { props: { contractA, contractB, addressA: params.addressA, addressB: params.addressB } };
};


export default DiffPage
