CREATE TABLE app_files(id serial primary Key,app_id integer,path character varying COLLATE pg_catalog."default",role character varying[] COLLATE pg_catalog."default",type character varying COLLATE pg_catalog."default",file_name character varying COLLATE pg_catalog."default",source character varying COLLATE pg_catalog."default",CONSTRAINT app_id_fk FOREIGN KEY (app_id) REFERENCES public.app_data (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION);