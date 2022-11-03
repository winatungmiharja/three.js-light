## Visualisasi Penggunaan Light pada Three JS

repository ini dibuat dari dokumentasi Three.js

- Download atau CLone Repository berikut dari tombol `Code`
<img width="565" alt="image" src="https://user-images.githubusercontent.com/64743796/199544520-90438d5c-b67b-4f6e-9e05-5c6e3af0ee74.png">

- Setelah itu, extract dan buka di Visual Studio Code

- Direktori akan terlihat seperti berikut :

<img width="193" alt="image" src="https://user-images.githubusercontent.com/64743796/199544937-9fc215db-bbef-482b-bbb3-5ff798a7bef0.png">


- Jalankan live server pada `index.html` maka akan terlihat tampilan seperti berikut

<img width="954" alt="image" src="https://user-images.githubusercontent.com/64743796/199545356-f1e49fb2-33bb-414e-885a-22ef21c29619.png">

akses pilihan dan jenis-jenis light untuk mecoba-coba

- Pada VsCode, buka folder `/demo` dan akan terlihat berbagai macam implementasi, salah satunya yaitu sebagai berikut :

<img width="960" alt="image" src="https://user-images.githubusercontent.com/64743796/199545836-2f05031c-81ce-4276-9dff-27af9250564e.png">

- Tekan shortcut `Ctrl + K + 8` untuk menutup bagian-bagian inisialisasi dan lain-lain, maka kodingan akan menampilkan hanya bagian penting yang dibutuhkan untuk membuat jenis jenis light

<img width="959" alt="image" src="https://user-images.githubusercontent.com/64743796/199545877-26bc5f5f-31d0-4f76-a996-8807140900d9.png">

## Jenis-Jenis Light

- Ambient Light

<img width="956" alt="image" src="https://user-images.githubusercontent.com/64743796/199546386-5cf69dc6-8c18-4c04-b655-8503c160594c.png">

- Hemisphere Light

<img width="955" alt="image" src="https://user-images.githubusercontent.com/64743796/199546613-6d20fa1d-30f9-47d2-b0ad-76e3d8ac1013.png">

- Directional Light

<img width="957" alt="image" src="https://user-images.githubusercontent.com/64743796/199546673-85c84e3a-ddc1-41af-aa05-4963505c8f85.png">

- Point Light

<img width="956" alt="image" src="https://user-images.githubusercontent.com/64743796/199546772-5aa45475-e96e-40a3-bc6d-d51118d705c9.png">

- Spot Light

<img width="960" alt="image" src="https://user-images.githubusercontent.com/64743796/199546841-99566000-038a-4ede-a1cb-77e8c5e22d4f.png">

- Rect Area Light

<img width="959" alt="image" src="https://user-images.githubusercontent.com/64743796/199546878-c645c7e5-9a2e-4e07-a92e-2d13d9fd7871.png">

## Menmabahkan lebih dari satu cahaya

- kita bisa menambahkan lebih dari satu cahaya, caranya yaitu 
- membuat light baru dan menambahkan ke scene, contohnya adalah sebagai berikut


Directional Light dan Ambient Light
- kita akan meng-copy inisialisasi Ambient Light

![image](https://user-images.githubusercontent.com/64743796/199727128-230456d2-a5c4-43b5-988f-92b7a555748e.png)

- kemudian tinggal di paste pada Directional Light

![image](https://user-images.githubusercontent.com/64743796/199727242-163feac3-7dee-411c-852b-bd3eab3c9111.png)

![image](https://user-images.githubusercontent.com/64743796/199727323-6ac344b9-1fa3-4797-af98-93771b4269c3.png)


- Menambahkan banyak cahaya

![image](https://user-images.githubusercontent.com/64743796/199729459-24ba6e1f-1850-4d57-908a-a790b5244fa7.png)
