PGDMP  1    :                 |            ambdaweb_ambobigdata    14.12    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16644    ambdaweb_ambobigdata    DATABASE     �   CREATE DATABASE ambdaweb_ambobigdata WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
 $   DROP DATABASE ambdaweb_ambobigdata;
                ambdaweb_ambobigdata    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    16646 
   attendance    TABLE     �   CREATE TABLE public.attendance (
    id integer NOT NULL,
    event_id uuid,
    name text NOT NULL,
    email text,
    identifier text,
    unit text,
    submitted_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.attendance;
       public         heap    ambdaweb    false    4            �           0    0    TABLE attendance    ACL     >   GRANT ALL ON TABLE public.attendance TO ambdaweb_ambobigdata;
          public          ambdaweb    false    209            �            1259    16652    attendance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.attendance_id_seq;
       public          ambdaweb    false    4    209            �           0    0    attendance_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.attendance_id_seq OWNED BY public.attendance.id;
          public          ambdaweb    false    210            �            1259    16653    event    TABLE       CREATE TABLE public.event (
    id uuid NOT NULL,
    title text NOT NULL,
    date timestamp with time zone,
    uic integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone,
    status integer DEFAULT 0,
    file text
);
    DROP TABLE public.event;
       public         heap    ambdaweb    false    4            �           0    0    TABLE event    ACL     9   GRANT ALL ON TABLE public.event TO ambdaweb_ambobigdata;
          public          ambdaweb    false    211                       2604    16660    attendance id    DEFAULT     n   ALTER TABLE ONLY public.attendance ALTER COLUMN id SET DEFAULT nextval('public.attendance_id_seq'::regclass);
 <   ALTER TABLE public.attendance ALTER COLUMN id DROP DEFAULT;
       public          ambdaweb    false    210    209            �          0    16646 
   attendance 
   TABLE DATA           _   COPY public.attendance (id, event_id, name, email, identifier, unit, submitted_at) FROM stdin;
    public          ambdaweb    false    209          �          0    16653    event 
   TABLE DATA           [   COPY public.event (id, title, date, uic, created_at, updated_at, status, file) FROM stdin;
    public          ambdaweb    false    211   �       �           0    0    attendance_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.attendance_id_seq', 62, true);
          public          ambdaweb    false    210                       2606    16662    attendance attendance_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_pkey;
       public            ambdaweb    false    209                       2606    16664    event event_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.event DROP CONSTRAINT event_pkey;
       public            ambdaweb    false    211                       2606    16665    attendance FK_attendance_event    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT "FK_attendance_event" FOREIGN KEY (event_id) REFERENCES public.event(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;
 J   ALTER TABLE ONLY public.attendance DROP CONSTRAINT "FK_attendance_event";
       public          ambdaweb    false    211    209    4119            �   �  x��W�n�8}V����J����Iڦ�I�@�BGr�X�.	ү�!���.��0,�l`�g�93�I��K��{1��LD��D�<�pj�$,g�^E�&�آ0誯̳����~n|x(�-�}]Fѵ��m�f�+�h�'[������ƠsӘ.b��	��MR.Sc-b)�?Hr�0X�M�n��~7������[�&�5!�ČPF	%���)cXP!t�Q�0��~c��dhn��T]o�֖��_p9�=D�HL��/��A+S�S"=Z��\drm�z������D��j��\':I�{�G�6ohԻ�CHPA��(��ee�Hc)g)��I͕�uxF�3�ۼ̫m���,4-՘�1Uܥ$<-�>/��*(V�)|�@�^�-t-�5]4����|�և(b�)
(B�*�^,n���
���"�R�L1��M /�6yc+�����H���V��Z?"2楤����/�"JS�R*1�Z�-C;3MUG��Tb��(g�q�D���3I*	��$�KDXZЪm�ݽ��N�.ĭ���d �:ኡkwuQoǀhJ4�T$�㑁e�+����^L��>蒂Q������3��n0!8�q��u���̔����n7x�ك9@uf�
l���y��]g����0Z31�(	���h�̾�|�o�щ9�J(��a�/��߶vkv l�9'�B�C�T���y1���jH�1���h(�*��v�*3�`p L�0�J�2�-���=�+�h�8�����>���`�����\��+��4��`k@O�B3[��?�,��|��O�=�D�P����`1�8t��P�������R0�3Уo�5P�t}5o��K�>|�v��c���-�|���}Qe�Og���ĵI�{��;��ö2�O��Z��&�y��8�ϧ3����Z~Aߖ�Oӛ�F�~�� K�Vw���ݔ�0O�9�Qr4� HE�d��Oh�k���Fƅmg��i���q����`��t�SA��X8��f!m�������a�8�iT���έ��XL�'4��O�+!�Xð�C����.�.�@7��b�o���W��� � W��{,��8 �XVW�%�ufE����c��+2;D���z����<��O(2p��k떫�6�Q���o>/��H�� I242p��nc�4�҂2]���6��L�������P��      �   }  x���Ak�0����н��F�%��K�5]JCo�el�]mb��Υ���ڴ�P�{���#ݙe�m#��4w�l�땷�Z�:�nbX��M�\.=�Zߕ��|@0�J�J�������7U2i*�+e
���_qY(v[�K��S<w}�K�*�S�%׮��j���	��d5�l"MC`׿�^�HqGG���a7�;D��{ڰ_ᙦ1lX���s
q�'v�4�c�c�ǁ��L��-��G\����	�w�/��T%La��<TR5F��$��?9�Ƒl5�-"���RY�$�@`�w}8L]�8��y��#���8)d\!���T�|2�Ԅ�[�/���Ι�s��aQh(����I[iSISx'/���Z�c���+-��%     