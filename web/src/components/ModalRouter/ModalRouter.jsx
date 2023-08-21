// IMPORTING PACKAGES/MODULES
import { useRecoilState } from 'recoil'

import { modalTypeAtom } from 'src/contexts/atoms'

const ModalRouter = () => {
  // GETTING ATOMIC STATES
  const [modalType] = useRecoilState(modalTypeAtom)

  return <></>
}

export default ModalRouter
