import { getMaterialTypeAndCatalogn} from "@/api/matter/encoded";
import {
    selectDictLabel,
    getDictMultiple,
  } from '@/utils/tool'

const columns = async() => {
    // const types = await getMaterialTypeAndCatalogn();
    // const { goods_main_big_type } = await getDictMultiple(['goods_main_big_type'])

     const columns =[{
      label:'物料类别',
      prop:'categoryId',
      baseSearch: true,
      formFormat: {
        type: "select",
        icon: "icon-select",
        name: "下拉选择",
         flag: 0,
        options: {
            defaultValue: "",
            multiple: false,
            disabled: false,
            clearable: false,
            placeholder: "全部",
            required: false,
            showLabel: true,
            width: "100%",
           
            filterable: false,
            optionDataType: 2,
            interfaceMethod: "/system/materialType/getMaterialTypeAndCatalog",
            interfaceParam:'{"pageNum":"1","pageSize":"999"}',
            interfaceId: "get",
            tipFont: "",
            dictKey: "",
            resList: "data.materialCategoryVoList",
            props: {
                value: "categoryId",
                label: "categoryName",
              },
        },
        key: 1608804132000,
        model: "categoryId",
        rules: [],
    },
    formatter: (val,data) => {
        // for( let item of types.data.materialCategoryVoList){
        //     if( val  == item.categoryId)
        //     return item.categoryName
        //   }

        return data.categoryName
       
    },
  }, {
    label:'物料类型',
    prop:'typeId',
    baseSearch: true,
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
       flag: 0,
        options: {
            defaultValue: "",
            multiple: false,
            disabled: false,
            clearable: false,
            placeholder: "全部",
            required: false,
            showLabel: true,
            width: "100%",
          
            filterable: false,
            optionDataType: 2,
            interfaceMethod: "/system/system/dict/data/dictType/goods_main_big_type",
            interfaceParam:'{ }',
            interfaceId: "",
            resList: "data",
            "interfaceType": "get",
            tipFont: "",
            dictKey: "",
            props: {
              "value": "dictValue",
              "label": "dictLabel"
            },
        },
        key: 1608804132000,
        model: "typeId",
        rules: [],
    },
    formatter: (val,data) => {
  return data.typeName
      // return selectDictLabel(goods_main_big_type, val) || ' '
    },
  }, {
          label:'原始货号',
          prop:'originalNo',
          baseSearch: true,
      },{
        label: "物料名称",
        prop: "originalName",
        baseSearch: true,
      
      },
      
       {
          label:'收购价',
          prop:'purchasePrice',
          baseSearch: false,
          // type: 'num'
      },  {
          label:'成品销售价',
          prop:'sellPrice',
          baseSearch: false,
          // type: 'num'
      },  {
          label:'集团采购价',
          prop:'groupPrice',
          baseSearch: false,
          // type: 'num'
      },  {
          label:'最后修改时间',
          prop:'updateTime',
          type:'date&time'
      
  
      }
    ]
    return columns
  }

  const tableColumns = () => {
    let   tableColumns=[
        {
            label:'修改时间',
            prop:'updateTime',
            width:'160',
            type:'date&time'
        },
        {
            label:'修改人',
            prop:'updateName',
        },
        {
            label:'收购价',
            prop:'purchasePrice',
        },
        {
            label:'成品销售价',
            prop:'sellPrice',
        },
        {
            label:'集团采购价',
            prop:'groupPrice',
        }
      ]

      return tableColumns
  }

  

  export { columns,tableColumns}