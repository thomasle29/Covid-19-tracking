import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TrackingLog } from '../services/tracking/tracking.model';
import { TrackingService } from '../services/tracking/tracking.service';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { nodes, clusters, links } from '../graph/graph.data';
import { FColors } from '../services/color/color.service'
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import * as shape from 'd3-shape';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-tracing-page',
  templateUrl: './tracing-page.component.html',
  styleUrls: ['./tracing-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TracingPageComponent implements OnInit {
  name = 'NGX-Graph';

  fcolors = FColors;

  nodes: Node[] = [];

  clusters: ClusterNode[] = clusters;

  links: Edge[] = [];
  
  layout: String | Layout = 'dagre';

  // line interpolation
  curveType: string = 'Linear';
  curve: any = shape.curveLinear;
  // curve: any = shape.curveBundle.beta(1);
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];  

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = true;
  autoCenter: boolean = true; 

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  fNumber = new FormControl('', [Validators.required, Validators.min(3), Validators.max(10)]);
  f0ID = new FormControl('', [Validators.required]);
  numberOfDate = new FormControl('', [Validators.required, Validators.min(3)]);
  errorMessage: any;
  isLoading: boolean;

  isValid:boolean = false
  columnsToDisplayRow: string[] = ['trackingLogName', 'trackingLogPhone', 'trackingLogAddress', 'trackingLogFNumber'];
  expandedElement: TrackingLog | null;
  trackingLog: TrackingLog[] = [];
  dataSource = new MatTableDataSource(this.trackingLog);

  getErrorMessageF0ID(){
    return this.f0ID.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageFNumber() {
    if (this.fNumber.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.fNumber.hasError('min')) {
      return 'You must enter a value between 3 and 10';
    }

    return this.fNumber.hasError('max') ? 'You must enter a value between 3 and 10' : '';
  }

  getErrorMessageNumberOfDate() {
    if (this.numberOfDate.hasError('required')) {
      return 'You must enter a value';
    }

    return this.numberOfDate.hasError('min') ? 'You must enter a value > 3' : '';
  }

  constructor(
    private trackingService: TrackingService,
    private snotify: SnotifyService,
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.setInterpolationType(this.curveType);
  }

  public getColor(node: Node): any {
    return node.data.background_color
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setUpGraph(): void {
    this.nodes = []
    this.links = []
    let saveID: string[] = []
    for (let log of this.trackingLog) {
      console.log(log.trackingLogFNumber)
      let color: string = FColors[log.trackingLogFNumber].color

      let node: Node = {
        id: log.trackingLogID,
        label: log.trackingLogName,
        data: {
            address: log.trackingLogAddress,
            fnumber: log.trackingLogFNumber,
            background_color: color
        }
      }

      this.nodes.push(node)

      for (let idf of log.trackingLogBefore){

        if (idf == '0'){
          continue
        }

        let linkID: string = idf + log.trackingLogID.split('').reverse().join('')
        // console.log(linkID)

        if (saveID.find(element => (element == linkID || element == linkID.split('').reverse().join(''))) != null){
          continue
        }

        let link: Edge = {
          source: log.trackingLogID,
          target: idf
        }

        this.links.push(link)
        saveID.push(linkID)
      }
    }
    // console.log(this.nodes)
    // console.log(this.links)
  }

  getTracking(): void {
    this.errorMessage = null;
    this.isLoading = true;
    this.trackingService.getTracking(this.f0ID.value, this.fNumber.value, this.numberOfDate.value).subscribe(resp => {
      if (resp.returncode !== 1) {
        this.errorMessage = 'Cannot get detail visitor';
        return this.snotify.error(this.errorMessage, { timeout: 3000, position: SnotifyPosition.rightTop, });
      }
      // this.trackingLog = resp.data;
      // for (let log of this.trackingLog){
      //   if (log.trackingLogFNumber == 2){
      //     this.trackingLog[0].trackingLogBefore.push(log.trackingLogID)
      //   }
      // }
      this.dataSource = new MatTableDataSource(this.trackingLog);
      this.dataSource.paginator = this.paginator;
      this.isValid = true;
      // console.log(this.trackingLog)
      this.setUpGraph()
    }, err => {
      this.isLoading = false;
      this.snotify.error('Something went wrong, please try again!', { timeout: 3000, position: SnotifyPosition.rightTop, });
    }, () => {
      this.isLoading = false;
    });
  }

  filterByGraph(node: Node): void{
    this.dataSource.filter = node.id.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
    window.scrollTo(0, 0)
  }
}
