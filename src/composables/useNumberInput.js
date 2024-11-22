export function useNumberInput() {
    const preventInvalidNumberInput = (event    ) => {
      if (['e', 'E', '-', '+'].includes(event.key)) {
        event.preventDefault()
      }
    }
  
    return {
      preventInvalidNumberInput
    }
  }