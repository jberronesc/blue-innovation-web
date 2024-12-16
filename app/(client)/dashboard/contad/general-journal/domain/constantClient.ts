const GeneralJournalConstCli = {
  pQ: {},
  persistWhenClean: {},
  getPerst: () => [GeneralJournalConstCli.pQ],
  DISPONIBILIDADES: "111",
}

export default GeneralJournalConstCli

export enum GeneralJournalTypeTransaction {
  OPENING = "OPENING",
  OPENING_INITIAL = "OPENING_INITIAL",
  NORMAL = "NORMAL",
}
