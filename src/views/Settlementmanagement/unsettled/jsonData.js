// import { materialTypeList} from "@/api/matter/encoded"
const columns = async () => {
  // const types = await materialTypeList();
  const columns = [{
    label: '供应商/单位',
    prop: 'supplierName'
  }, {
    label: '发货金额',
    prop: 'deliveryConfirmAmountTotal',
    type: 'num',
    // bit:2
  }, {
    label: '发货已结算金额',
    prop: 'deliveryAlreadyAmountTotal',
    type: 'num',
    // bit:2
  }, {
    label: '发货未结算金额',
    prop: 'deliveryNotYetAmountTotal',
    type: 'num',
    // bit:2
  }, {
    label: '退货金额',
    prop: 'returnedConfirmAmountTotal',
    type: 'num',
    // bit:2
  }, {
    label: '退货已结算金额',
    prop: 'returnedAlreadyAmountTotal',
    type: 'num',
    // bit:2
  }, {
    label: '退货未结算金额',
    prop: 'returnedNotYetAmountTotal',
    type: 'num',
    // bit:2
  }, {
    label: '未结算金额',
    prop: 'notYetAmountTotal',
    type: 'num',
    // bit:2
  }]
  return columns
}
export {
  columns
}
