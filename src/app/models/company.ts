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
