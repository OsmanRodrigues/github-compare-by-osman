import * as React from 'react'
import ClayButton from '@clayui/button'
import ClayModal from '@clayui/modal'
import { ModalProps } from '../models/modal.model'

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
