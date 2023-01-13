import { defineStore } from 'pinia';

export interface ColumnDefinition {
    name: string;
    imageData?: string;
}

export const useBaseStore = defineStore('base', {
    state: () => ({
        columns: 4,
        columnDefinitions: [] as Array<ColumnDefinition>
    }),
    getters: {
        getColumnDefinition: (state) => {
            return (index: number) => state.columnDefinitions[index] ?? {
                name: ''
            };
        }
    },
    actions: {
        setNumberOfColumns(amount: number) {
            this.columns = amount;
        },
        setColumnName(columnIndex: number, name: string) {
            this.columnDefinitions[columnIndex] = Object.assign(this.columnDefinitions[columnIndex] ?? {}, {
                name,
            });
        },
        setColumnImage(columnIndex: number, imageData: string) {
            this.columnDefinitions[columnIndex] = Object.assign(this.columnDefinitions[columnIndex] ?? {}, {
                imageData,
            });
        },
    }
});