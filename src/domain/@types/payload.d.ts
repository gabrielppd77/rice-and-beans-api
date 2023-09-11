interface Payload {
  sub: {
    userId: string;
    companyId: string;
  };
  iat: number;
  exp: number;
}

interface PayloadToCreate {
  sub: {
    userId: string;
    companyId: string;
  };
}
