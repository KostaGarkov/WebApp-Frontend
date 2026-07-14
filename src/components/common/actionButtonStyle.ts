export const actionButtonStyle = (size: 'small' | 'medium' | 'large' = 'medium') => ({
  padding:
    size === 'large' ? '10px 18px' :
    size === 'medium' ? '8px 14px' :
    '4px 10px',

  borderRadius:
    size === 'large' ? '14px' :
    size === 'medium' ? '10px' :
    '8px',

  fontSize:
    size === 'large' ? '1rem' :
    size === 'medium' ? '0.9rem' :
    '0.8rem',

  gap:
    size === 'large' ? '6px' :
    size === 'medium' ? '4px' :
    '2px',

  fontWeight: 500,
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
});
