import requests
import pytest


class Test_XDY():

    @pytest.mark.parametrize("pageNum,pageSize",[(1,10),(2,10),(3,10),(4,20),(5,20)])
    def test_001(self,pageNum,pageSize):
        print('test11111111111111111111111111111')
        url = 'https://xindianyi.mvheartcare.net/msg/page'
        headers = {
            'Authorization':'test'
        }
        params = {
            'pageNum':pageNum,
            'pageSize':pageSize
        }
        res = requests.get(url=url,params=params,headers=headers)
        print(res.text)
        assert res.status_code==200


# if __name__== '__main__':
#     pytest.main()
