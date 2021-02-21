import * as React from 'react'
import ClayButton from '@clayui/button'
import ClayModal from '@clayui/modal'
import { Observer as ClayModalObserver } from '@clayui/modal/lib/types'

interface ModalProps {
  observer: ClayModalObserver
  visible: boolean
  closeModalHandler: () => void
  confirmActionModalHandler: () => void
}

export const Modal: React.FC<ModalProps> = ({
  closeModalHandler,
  confirmActionModalHandler,
  children,
  observer,
  visible
}) => {
  return (
    <>
      {visible && (
        <ClayModal observer={observer} size="sm" status="warning">
          <ClayModal.Header>{'Delete repository'}</ClayModal.Header>
          <ClayModal.Body>{children}</ClayModal.Body>
          <ClayModal.Footer
            first={
              <ClayButton.Group spaced={true}>
                <ClayButton onClick={closeModalHandler} displayType="secondary">
                  {'Cancel'}
                </ClayButton>
                <ClayButton
                  onClick={() => {
                    confirmActionModalHandler()
                    closeModalHandler()
                  }}
                  displayType="primary"
                  style={{
                    backgroundColor: '#B95000',
                    borderColor: '#B95000'
                  }}
                >
                  {'Delete'}
                </ClayButton>
              </ClayButton.Group>
            }
          />
        </ClayModal>
      )}
    </>
  )
}
