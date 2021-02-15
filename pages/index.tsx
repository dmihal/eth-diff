import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const [contractA, setContractA] = useState('');
  const [contractB, setContractB] = useState('');

  const compare = () => router.push('/[addressA]/[addressB]', `/${contractA}/${contractB}`);

  return (
    <Layout title="ETHDiff">
      <h1>Fork safely</h1>

      <div>
        <input value={contractA} onChange={(e: any) => setContractA(e.target.value)} />
        <input value={contractB} onChange={(e: any) => setContractB(e.target.value)} />
      </div>

      <div>
        <button onClick={compare} disabled={contractA.length !== 42 || contractB.length !== 42}>
          Compare code
        </button>
      </div>

      <p>
        Sample diff:{' '}
        <Link href="/[addressA]/[addressB]" as="/0xc2edad668740f1aa35e4d8f227fb8e17dca888cd/0x1daed74ed1dd7c9dabbe51361ac90a69d851234d">
          <a>SushiSwap vs SashimiSwap</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage
