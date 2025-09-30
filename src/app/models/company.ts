interface ResponseCompany {
  companies: Company[]
}

interface Company {
  id: string,
  doingBusinessAs: string,
  managerName: string,
  subscriptionPlan: string,
  subscriptionStatus: boolean
}

interface RequestRegisterCompany {
  cnpj: string,
  legalName: string,
  doingBusinessAs?: string,
  cep: string,
  addressNumber: string,
  businessEmail?: string,
  phoneNumber: string,
  whatsappApiNumber?: string,
  managerId?: string,
  webSite?: string
}
