export interface Contract {
  source: string;
  name: string;
}

export async function getContract(address: string): Promise<Contract | null> {
  const request = await fetch(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.NEXT_APP_ETHERSCAN}`);
  const response = await request.json();

  if (response.status === '0' || response.result[0].SourceCode === '') {
    return null;
  }

  return {
    source: response.result[0].SourceCode,
    name: response.result[0].ContractName,
  };
}
