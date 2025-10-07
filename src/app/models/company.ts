interface ResponseCompanies {
  companies: ShortCompany[]
}

interface ResponseCompany {
  id: string,
  createdOn: Date,
  updatedOn: Date,
  active: boolean,
  cnpj: string,
  legalName: string,
  doingBusinessAs: string,
  businessSector: string,
  cep: string,
  address: string,
  addressNumber: string,
  businessEmail: string,
  phoneNumber: string,
  manager: string,
  subscriptionStatus: boolean,
  website: string
}

interface ShortCompany {
  id: string,
  doingBusinessAs: string,
  managerName: string,
  subscriptionPlan: string,
  subscriptionStatus: boolean
}

interface RequestRegisterCompany {
  cnpj: string,
  legalName: string,
  doingBusinessAs: string,
  cep: string,
  addressNumber: string,
  businessEmail: string,
  phoneNumber: string,
  whatsappApiNumber: string,
  managerId: string,
  webSite: string
}
