import { useState, useEffect } from 'react';
import { Table, Pagination, Button } from 'antd';
import { fetchFinishedRecipes } from '@api/dashboard/recipes';
import { DatePicker, Space } from 'antd';
import useClientStore from '@store/clientStore';
import OrderedProductsList from '../../pos/desktop/OrderedProductsList';
const { RangePicker } = DatePicker;
import moment from 'moment';

function RecipeList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { recipeId, setRecipeId, coffeeShopId } = useClientStore();
  const [isDetails, setIsDetails] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    console.log("hi")
    const fetchRecipes = async () => {
      const response = await fetchFinishedRecipes(
        coffeeShopId,
        page,
        limit,
        dateRange[0] && dateRange[0].format('YYYY-MM-DDTHH:mm:ss.SSS'),
        dateRange[1] && dateRange[1].format('YYYY-MM-DDTHH:mm:ss.SSS')
        
      );
      console.log(response.recipes);
      setRecipes(response.recipes);
      setTotalPages(response.totalPages);
    };
    fetchRecipes();
  }, [page, limit, dateRange]);

  const columns = [
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'employee',
      dataIndex: ['Employee', 'username'],
      key: 'Employee.username',
    },
  ];

  const handlePageChange = (newPage, newLimit) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  const handleRowClick = (record) => {
    setIsDetails(true);
    setRecipeId(record.id);
    console.log('recipe id: ', recipeId);
  };

  return (
    <div>
      <div className="test h-[50px] flex items-center">
        <Space direction="vertical" size={12}>
          <RangePicker
            onChange={(dates, dateStrings) => {
              console.log(dates);
              setDateRange(dates);
            }}
          />
        </Space>
      </div>
      <div>
        {isDetails && recipes && recipeId != null ? (
          <div>
            <Button onClick={() => setIsDetails(false)}>hi</Button>
            <OrderedProductsList orderId={10} />
          </div>
        ) : (
          <>
            <Table
              dataSource={recipes}
              columns={columns}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => handleRowClick(record),
                };
              }}
            />

            <Pagination
              current={page}
              pageSize={limit}
              total={totalPages * limit}
              onChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default RecipeList;
