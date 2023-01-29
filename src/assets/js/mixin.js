/*! direct by hjm */
/*组件中重复使用代码段*/

//列表页面的分页、跳转页面、单个删除后调用方法
/*
使用说明
1.import {tableList} from '@/assets/js/minix';
2.mixins: [tableList]
3.data()的里参数统一命名，使用页面不用重新写
4.获取列表方法名统一命名为:tableData,请求参数pageNo:this.currentPage,pageSize:this.pageSize,
  请求成功后，统一调用方法handleTable()
5.删除成功后，统一调用方法handleDelLast()

案例
1.商户：模板管理->运费模板管理, 活动管理->满减活动, 活动管理->满减活动->查看对话框
2.平台：活动管理->满减活动, 活动管理->满减活动->查看对话框
*/
export const tableList={
	data() {
    	return {
	        currentPage: 1, //第几页
	        pageSizes:[5,10,20], //每页显示条数选择
	        pageSize:10, //每页显示的条数
	        totalCount: 15, //总条数  
	        tableDataArray: [], //列表数据
	        frequency:1, //请求次数 防止分页异步请求，页面展示不是最后数据
	    }
    },
    methods: {
	    //每页显示多少条数据
	    handleSizeChange(val) {	    	
	        this.pageSize = val;
	        //debugger
	        this.tableData(++this.frequency);
	    },
	    //跳转到当前页
	    handleCurrentChange(val) {	    	
	        this.currentPage = val;
	        this.tableData(++this.frequency);
	    },   
	    //删除成功后调用的，删除最后一页最后一条数据时，currentPage-1  
	    handleDelLast(){    	
	    	let num = (this.totalCount-1)%this.pageSize;
	    	if(num==0){
	    		--this.currentPage;
	    		if(this.currentPage<=0){
	    			this.currentPage=1;
	    		}
	    	}
	    	//弹对话框
	    	this.messageSuccess('删除成功');
	    	//查询列表
	    	this.tableData();
	    },
	    //页面展示最后一次请求数据
	    handleTable(i,data){
	    	if(i == undefined || this.frequency==i){
	            this.tableDataArray = data.list;
	            this.totalCount = data.pagingVO.totalCount;
	        }
	    }
    }
}