// IMPORTING PACKAGES/MODULES
import { useRecoilState } from 'recoil'

import { modalTypeAtom } from 'src/contexts/atoms'

import InvoiceModal from '../InvoiceModal/InvoiceModal'

const ModalRouter = () => {
  // GETTING ATOMIC STATES
  const [modalType] = useRecoilState(modalTypeAtom)

  if (modalType === 'invoice') return <InvoiceModal />
  return <></>
}

export default ModalRouter
