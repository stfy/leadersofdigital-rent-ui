export const AirportTheme = {
    colors: {
        'orange-bg': '#FFAC02',
        'input-bg': '#F5F4F2',
        black: '#06111A'
    },
    fonts: {
        body: "DIN Pro, Roboto Condensed, sans-serif",
        heading: "DIN Pro, Roboto Condensed, sans-serif",
        link: "DIN Pro, Roboto Condensed, sans-serif"
    },
    components: {
        Progress: {
            baseStyle: {
                track: {bg: 'black'},
                filledTrack: {bg: '#FFAC02'}
            },
        },
        Divider: {
            baseStyle: {
                height: '2px',
                width: '100%',
                bg: 'black',
                opacity: 1,
                position: 'relative',
                top: '4px'
            }
        },
        Tabs: {
            variants: {
                'rentersList': {
                    tab: {
                        fontSize: '32px',
                        fontWeight: 700,
                        paddingInlineStart: 0,
                        _selected: {
                            color: '#FFAC02'
                        }
                    },
                    tabpanel: {
                        padding: 0
                    }
                }
            }
        },
        Tag: {
          baseStyle: {
              label:  {
                  fontSize: '18px',
                  padding: '4px 14px',
              },
              container: {
                  border: '1px solid',
                  borderRadius: 0,
              }
          },
          variants: {
              confirmed: {
                  container: {
                      borderRadius: 0,
                      borderColor: '#00A372'
                  },
                  label:  {
                      color: '#00A372'
                  },
              },
              pending: {
                  container: {
                      borderRadius: 0,
                      borderColor: '#FFAC02'
                  },
                  label:  {
                      color: '#FFAC02'
                  },
              }
          }
        }
    }
}