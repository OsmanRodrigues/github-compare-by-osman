import { Observer as ClayModalObserver } from '@clayui/modal/lib/types'

export interface ModalProps {
  observer: ClayModalObserver
  visible: boolean
  closeModalHandler: () => void
  confirmActionModalHandler: () => void
}
