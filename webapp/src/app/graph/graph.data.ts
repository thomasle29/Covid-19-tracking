import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';

export const nodes: Node[] = [
  {
    id: '1',
    label: 'Dang Anh An',
    data: {
        address: 'Ho Chi Minh',
        background_color: '#a27ea8'
    }
  }, {
    id: '2',
    label: 'Vo Viet Phuc',
    data: {
        address: 'Ninh Binh',
        background_color: '#a27ea8'
    }
  }, {
    id: '3',
    label: 'Tran Thi Hieu',
    data: {
        address: 'Buon Ma Thuot',
        background_color: '#a27ea8'
    }
  }, {
    id: '4',
    label: 'Pham Van Cuong',
    data: {
        address: 'Hue',
        background_color: '#a27ea8'
    }
  }
];

export const clusters: ClusterNode[] = [
//   {
//     id: 'third',
//     label: 'C',
//     childNodeIds: ['c1', 'c2']
//   }
]

export const links: Edge[] = [
  {
    id: 'a',
    source: '1',
    target: '2'
  }, {
    id: 'b',
    source: '1',
    target: '3'
  }, {
    id: 'c',
    source: '3',
    target: '2'
  }, {
    id: 'd',
    source: '2',
    target: '4'
  }
];