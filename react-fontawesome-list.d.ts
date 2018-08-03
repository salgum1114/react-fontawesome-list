declare module 'react-fontawesome-list' {
  import * as React from 'react'

  interface IconsProps {
    onClick?: () => void,
    search: boolean,
    grid: string | number,
    icons: Array<T>,
    icon: Object,
    selected: boolean,
    style: Object,
    iconStyle: Object,
  }

  export class Icons extends React.Component<
    IconsProps,
    React.ComponentState
  > {}

  interface IconProps {
    name: string,
    color: string,
    style: Object,
    className: string,
    size: number,
    innerIcon: string,
    innerColor: string,
    innerClassName: string,
    innerSize: number,
    prefix: string,
  }

  export class Icon extends React.Component<
    IconProps,
    React.ComponentState
  > {}

}
