const Box = styled.div`
  ${color}
  ${space}
`;

Box.defaultProps = {
  p: 3,
  px: [3, 2, 5],
  py: [2,0],
  pl: [3],
};


Box.defaultProps.p = 4;
Box.defaultProps['pr'] = 4;

<Box pr={3} mode m="4" p={2} pl="1" mr={[4,5]} />