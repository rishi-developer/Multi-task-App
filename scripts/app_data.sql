CREATE TABLE app_data(id SERIAL PRIMARY KEY,name character varying COLLATE pg_catalog."default",is_selected boolean,is_third_party character varying COLLATE pg_catalog."default",source character varying COLLATE pg_catalog."default",description character varying COLLATE pg_catalog."default",sub_description character varying COLLATE pg_catalog."default",url character varying COLLATE pg_catalog."default",webview character varying COLLATE pg_catalog."default",keyword boolean,keywords character varying[] COLLATE pg_catalog."default",category character varying COLLATE pg_catalog."default",navig character varying COLLATE pg_catalog."default",size character varying COLLATE pg_catalog."default",dark_source character varying COLLATE pg_catalog."default",is_slider_list boolean,is_banner boolean,banner character varying COLLATE pg_catalog."default",is_required boolean,card_name character varying COLLATE pg_catalog."default",card_message character varying COLLATE pg_catalog."default",is_token boolean,screenshots character varying[] COLLATE pg_catalog."default",order_no integer,)
