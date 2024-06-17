const detectTriangle = (sideA, sideB, sideC) => {
  [sideA, sideB, sideC] = [sideA, sideB, sideC]
    .map((side) => {
      if (!Number.isInteger(side)) {
        throw new Error('Sides have to be integer');
      }

      if (side < 1) {
        throw new Error('Strange Triangle');
      }

      return side;
    }).sort();

  if (sideA + sideB <= sideC) {
    throw new Error('Triangle does not conform inequality principle');
  }
  if (sideA === sideB && sideA === sideC) {
    return 'Equilateral Triangle';
  }

  if (sideA === sideB || sideB === sideC) {
    return 'Isosceles Triangle';
  }

  return 'Scalene Triangle';


};

describe('Detect the triangle', () => {
  it('Should fail if the sides are less than 1', () => {
    expect(() => detectTriangle(-1, 2, 2)).toThrowError('Strange Triangle');
    expect(() => detectTriangle(1, -2, 2)).toThrowError('Strange Triangle');
    expect(() => detectTriangle(1, 2, -2)).toThrowError('Strange Triangle');
  });

  it('should fail if the sides are not integer', () => {
    expect(() => detectTriangle('a', 2, 2)).toThrowError('Sides have to be integer');
    expect(() => detectTriangle(1, 'a', 2)).toThrowError('Sides have to be integer');
    expect(() => detectTriangle(1, 2, 'a')).toThrowError('Sides have to be integer');
    expect(() => detectTriangle(' ', 2, 2)).toThrowError('Sides have to be integer');
  });

  it('Should detet Equilateral Triangle if all sides are equal', () => {
    expect(detectTriangle(1, 1, 1)).toEqual('Equilateral Triangle');
    expect(detectTriangle(1, 2, 2)).not.toEqual('Equilateral Triangle');
  });

  it('Should detect Isosceles Triangle if only two sides are equal', () => {
    expect(detectTriangle(2, 2, 3)).toEqual('Isosceles Triangle');
    expect(detectTriangle(4, 2, 4)).toEqual('Isosceles Triangle');
    expect(detectTriangle(1, 2, 2)).toEqual('Isosceles Triangle');
    expect(detectTriangle(4, 1, 4)).toEqual('Isosceles Triangle');
  });

  it('Should detect Scalene Triangle if no sides are the same', () => {
    expect(detectTriangle(2, 4, 3)).toEqual('Scalene Triangle');
  });

  it('Should detect inequality problem', () => {
    expect(() => detectTriangle(4, 1, 2))
      .toThrowError('Triangle does not conform inequality principle');
    expect(() => detectTriangle(5, 1, 3))
      .toThrowError('Triangle does not conform inequality principle');
  });
});