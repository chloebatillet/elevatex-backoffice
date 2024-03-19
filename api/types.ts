interface Contact {
  firstname: string;
  lastname: string;
  address: Address;
  telephone?: number;
  email: string;
}

interface Address {
  name?: string;
  address: string;
  postalCode: number;
  city: string;
  country: string;
}
