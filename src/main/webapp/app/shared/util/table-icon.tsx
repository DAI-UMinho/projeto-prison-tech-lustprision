import React, {forwardRef} from "react";
import AddBox from "@material-ui/icons/AddBox";
import CancelIcon from '@material-ui/icons/Cancel';
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';

const TableIcon = {
  Add: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <AddBox {...mProps} ref={ref} color="action" />),
  Cancel: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <CancelIcon {...mProps} ref={ref} />),
  Check: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <Check {...mProps} ref={ref} />),
  Clear: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <Clear {...mProps} ref={ref} />),
  Delete: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <DeleteIcon {...mProps} ref={ref} />),
  DetailPanel: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <ChevronRight {...mProps} ref={ref} />),
  Edit: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <Edit {...mProps} ref={ref} />),
  Export: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <SaveAlt {...mProps} ref={ref} />),
  Filter: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <FilterList {...mProps} ref={ref} />),
  FirstPage: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <FirstPage {...mProps} ref={ref} />),
  LastPage: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <LastPage {...mProps} ref={ref} />),
  NextPage: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <ChevronRight {...mProps} ref={ref} />),
  PreviousPage: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <ChevronLeft {...mProps} ref={ref} />),
  ResetSearch: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <Clear {...mProps} ref={ref} />),
  Search: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <Search {...mProps} ref={ref} />),
  SortArrow: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <ArrowDownward {...mProps} ref={ref} />),
  ThirdStateCheck: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <Remove {...mProps} ref={ref} />),
  ViewColumn: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <ViewColumn {...mProps} ref={ref} />),
  Done: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <DoneIcon {...mProps} ref={ref} />),
  Revert: forwardRef((mProps, ref: (instance: (SVGSVGElement | null)) => void) => <ReplayIcon {...mProps} ref={ref} />),
};

export default TableIcon;
