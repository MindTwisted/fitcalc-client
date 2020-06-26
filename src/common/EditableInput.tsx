import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Input, Icon, Button, InputProps } from 'semantic-ui-react'
import i18n from '../localization/i18n'

type EditableInputProps = {
  defaultValue: string
  onSubmitInput: (value: string) => Promise<void | {changeValue: boolean}> | void | {changeValue: boolean}
  onCancelEditing: () => void
  type?: string
} & InputProps

const EditableInput: React.FC<EditableInputProps> = ({ 
  defaultValue,
  onSubmitInput,
  onCancelEditing,
  id,
  type= 'text'
}: EditableInputProps) => {
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const inputEl = useRef<HTMLInputElement>(null!)
  
  useEffect(() => {
    if (editable) {
      inputEl.current.focus()
    }
  }, [editable])

  const isChanged = () => value !== defaultValue
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  
  const handleCancel = () => {
    setValue(defaultValue)
    setEditable(false)
    
    onCancelEditing()
  }
  
  const handleSubmit = async () => {
    const submitData = await onSubmitInput(value)

    // noinspection PointlessBooleanExpressionJS
    if (submitData && submitData.changeValue === false) {
      setValue(defaultValue)
    }

    setEditable(false)
  }

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      
      if (isChanged()) {
        await handleSubmit()
      }
    }
  }
  
  return (
    <Input disabled={!editable}
      action
      onKeyDown={handleKeyDown}
    >
      <input type={type}
        value={value}
        onChange={handleChange}
        ref={inputEl}
        id={id}
      />
      
      {editable ? (
        <Button.Group>
          <Button icon
            secondary
            onClick={handleCancel}
            aria-label={i18n.t('Cancel')}
          >
            <Icon name='cancel' />
          </Button>

          {isChanged() && (
            <Button icon
              primary
              onClick={handleSubmit}
              aria-label={i18n.t('Save')}
            >
              <Icon name='save' />
            </Button>
          )}
        </Button.Group>
      ) : (
        <Button icon
          secondary
          onClick={() => setEditable(true)}
          aria-label={i18n.t('Edit')}
        >
          <Icon name='edit' />
        </Button>
      )}
    </Input>
  )
}

export default EditableInput